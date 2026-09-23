<?php

namespace WireKit;

use Illuminate\View\Compilers\ComponentTagCompiler;

class WireKitTagCompiler extends ComponentTagCompiler
{
    /**
     * Compile the opening tags within the given string.
     *
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    protected function compileOpeningTags(string $value)
    {
        $pattern = "/
            <
                \s*
                wire[\:]([\w\-\:\.]*)
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class|style|checked|selected|disabled|readonly|required)\s*(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
                (?<![\/=\-])
            >
        /x";

        return preg_replace_callback($pattern, function (array $matches) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString(
                $this->preProcessBooleanDirectives($matches['attributes'])
            );

            $component = $matches[1];
            if (!str_contains($component, '.')) {
                $component .= '.index';
            }

            return $this->componentString("wire::$component", $attributes);
        }, $value);
    }

    /**
     * Compile the self-closing tags within the given string.
     *
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    protected function compileSelfClosingTags(string $value)
    {
        $pattern = "/
            <
                \s*
                wire[\:]([\w\-\:\.]*)
                \s*
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class|style|checked|selected|disabled|readonly|required)\s*(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
            \/>
        /x";

        return preg_replace_callback($pattern, function (array $matches) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString(
                $this->preProcessBooleanDirectives($matches['attributes'])
            );

            $component = $matches[1];
            if (!str_contains($component, '.')) {
                $component .= '.index';
            }

            return $this->componentString("wire::$component", $attributes) . "\n@endComponentClass##END-COMPONENT-CLASS##";
        }, $value);
    }

    /**
     * Process boolean blade directives before compilation
     *
     * @param string $attributeString
     * @return string
     */
    protected function preProcessBooleanDirectives(string $attributeString): string
    {
        return preg_replace(
            '/@(checked|selected|disabled|readonly|required)\s*\(([^)]+)\)/',
            ':$1="$2"',
            $attributeString
        );
    }

    /**
     * Compile the closing tags within the given string.
     *
     * @return string
     */
    protected function compileClosingTags(string $value)
    {
        return preg_replace("/<\/\s*wire[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
